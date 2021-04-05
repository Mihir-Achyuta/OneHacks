import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import {
  Flex,
  Text,
  Heading,
  Button,
  CloseButton,
  Link,
  Input,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function NoteForm() {
  const [sender] = useState("Sender");
  const [recipient] = useState("Recipient");
  const [message, setMessage] = useState("");

  function UpdateDBs() {
    var db = firebase.firestore();
    var user_id = "TMTD86D3yZN3zfMT6xsgp0y4LTW2";
    var note_id = uuidv4();
    var restaurant_id = uuidv4();

    var user = db.collection("users").doc(user_id);
    var note = db.collection("notes").doc(note_id);
    var restaurant = db.collection("restaurants").doc(restaurant_id);

    user
      .get()
      .then((data) => {
        var user_data = data.data();
        user_data["notes"].push(note_id);
        user_data["restaurants"].push(restaurant_id);
        user_data["restaurants"] = [...new Set(user_data["restaurants"])];
        console.log(user_data);

        user
          .set(user_data)
          .then(console.log("users db update worked!"))
          .catch((e) => {
            console.log("error in users db update: " + e);
          });

        note
          .set({ author: sender, message: message, recipient: restaurant_id })
          .then(console.log("notes db update worked!"))
          .catch((e) => {
            console.log("error in notes db update: " + e);
          });

        restaurant
          .set({ name: recipient, url: "URL", location: { lat: 0, long: 0 } })
          .then(console.log("restaurants db update worked!"))
          .catch((e) => {
            console.log("error in restaurants db update: " + e);
          });
      })
      .catch((e) => {
        console.log("error in user db get: " + e);
      });
  }
  const history = useHistory();
  useEffect(() =>
    firebase
      .auth()
      .onAuthStateChanged((user) =>
        user ? console.log("Signed In") : history.push("/signup")
      )
  );
  return (
    <Flex
      flexDirection="column"
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        maxWidth="1000px"
        marginLeft="100px"
        marginRight="100px"
      >
        <Link href="/businesses">
          <ArrowBackIcon
            h="40px"
            w="40px"
            marginBottom="50px"
            color="teal.300"
          />
        </Link>
        <Heading color="teal.600" marginBottom="10px">
          Submit your appreciation/thank you note here.
        </Heading>
        <Text color="teal.500" marginBottom="30px">
          Please fill out all the fields as they are necessary
        </Text>
        <Flex flexDirection="column" marginBottom="15px">
          <FormLabel htmlFor="sender" color="teal.500">
            Sender
          </FormLabel>
          <Input
            name="sender"
            value={sender}
            readOnly
            color="teal.700"
            borderColor="teal.600"
            focusBorderColor="teal.700"
            backgroundColor="teal.50"
            fontWeight="bold"
          />
        </Flex>
        <Flex flexDirection="column" marginBottom="15px">
          <FormLabel htmlFor="recipient" color="teal.500">
            Recipient
          </FormLabel>
          <Input
            name="recipient"
            value={recipient}
            readOnly
            color="teal.700"
            borderColor="teal.600"
            focusBorderColor="teal.700"
            backgroundColor="teal.50"
            fontWeight="bold"
          />
        </Flex>
        <Flex flexDirection="column" marginBottom="15px">
          <FormLabel htmlFor="recipient" color="teal.500">
            Message
          </FormLabel>
          <Textarea
            placeholder="Enter your note here"
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
            color="teal.700"
            borderColor="teal.600"
            focusBorderColor="teal.700"
            backgroundColor="teal.50"
            fontWeight="bold"
          />
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center">
          <CloseButton
            size="lg"
            color="teal.300"
            marginRight="15px"
            onClick={() => setMessage("")}
          />
          <Button
            colorScheme="teal"
            size="lg"
            disabled={message.length === 0}
            onClick={UpdateDBs}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NoteForm;

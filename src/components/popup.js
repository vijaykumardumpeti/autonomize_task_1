    import React, { useState } from "react";
    import { PiPencil } from "react-icons/pi";


    import {
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton,
        Button,
        FormControl,
        FormLabel,
        Input,
        useDisclosure
    } from '@chakra-ui/react'

    function InitialFocus(props) {
        const { updateTodo, taskObject} = props

        const { isOpen, onOpen, onClose } = useDisclosure();

        // const initialRef = React.useRef(null);
        // const finalRef = React.useRef(null);

        const [newTodoName, setNewTodoName] = useState('')


        const handleUpdate = (taskObject)=>{
                updateTodo(taskObject, newTodoName)
            //close the popup
            onClose()
        }

    return (
        <>
    
        <PiPencil onClick={onOpen}/>
    

        <Modal
            // initialFocusRef={initialRef}
            // finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Update Your Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Input onChange={(e)=> setNewTodoName(e.target.value)}  placeholder="Write code 3" />
                </FormControl>

                {/* <FormControl mt={4}>
                <FormLabel>quantity</FormLabel>
                <Input placeholder="Last name" type="number" />
                </FormControl> */}
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={()=>{
                    if(newTodoName !== ''){
                        handleUpdate(taskObject)
                    }
                }}>
                Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
    }

    export default InitialFocus;

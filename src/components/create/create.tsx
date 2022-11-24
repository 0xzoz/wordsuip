
import React from "react";
import { Box, Container } from '@mui/material';
import MDEditor, {
    commands,
    ICommand,
    TextState,
    TextAreaTextApi
  } from "@uiw/react-md-editor";
  import { Toolbar } from "./toolbar";

const Create = () => {
    const [value, setValue] = React.useState("**Hello world!!!**");


    return (
        <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <Toolbar />
                <Box sx={{ pt: 3 }}>
                    <div data-color-mode="light">
                        <MDEditor
                        value={value}
                        onChange={(val) => {
                            setValue(val!);
                        }}
                        />
                    </div>
                </Box>
            </Container>
        </Box>
      </>
    );
}

export default Create;
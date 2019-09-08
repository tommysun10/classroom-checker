import React, { FC } from 'react';
import { Field, FormikProps } from 'formik';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface ClassroomInputFieldProps {
    classroom: string
}


const ClassroomInputField: FC<FormikProps<ClassroomInputFieldProps>> = (props: FormikProps<ClassroomInputFieldProps>) => {
    const { handleSubmit, handleChange } = props;
    return (
        <Box textAlign="center">
            <Field id="classroom" component={TextField} onChange={handleChange} variant="outlined" />
            <Button onClick={() => handleSubmit()} variant="contained" style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>Submit</Button>
        </Box>
    )
}

export { ClassroomInputField };
import React, { FC, Fragment, useEffect, useState, } from 'react';
import { Formik } from 'formik';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { fetchData } from '../util/get-data';
import { ClassroomInputField } from '../components/form/classroom-input-field';


const HomeScreen: FC = () => {
    const [allClasses, setAllClasses] = useState();
    const [filteredClasses, setFilteredClasses] = useState();

    // useEffect(() => {
    //     setAllClasses(fetchData)
    // }, []);

    return (
        <Box textAlign="center" alignSelf="center">
            <Typography variant="h3">
                Search for a classroom!
           </Typography>
            <Formik
                initialValues={{ classroom: '' }}
                onSubmit={(value) => console.log(value)}
                render={props => <ClassroomInputField {...props} />}
            />
            

        </Box>
    )
}

export { HomeScreen };
import React, { FC, Fragment, useEffect, useState } from "react";
import { Formik } from "formik";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import {
  fetchData,
  validateClasses,
  findClassesByClassroom
} from "../util/get-data";
import { ClassroomInputField } from "../components/form/classroom-input-field";

import classes from "../asset/202010.test.json";

const HomeScreen: FC = () => {
  const [allClasses, setAllClasses] = useState({});
  const [filteredTimes, setFilteredTimes] = useState({});

  useEffect(() => {
    // const getData = async () => {
    //   setAllClasses(await fetchData());
    // };
    setAllClasses(validateClasses(classes));
  }, []);

  return (
    <Box textAlign="center" alignSelf="center">
      <Typography variant="h3">Search for a classroom!</Typography>
      <Formik
        initialValues={{ classroom: "" }}
        onSubmit={value => {
          setFilteredTimes(findClassesByClassroom(allClasses, value.classroom));
          console.log(filteredTimes);
        }}
        render={props => <ClassroomInputField {...props} />}
      />
    </Box>
  );
};

export { HomeScreen };

"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseCreate } from "./course/create";
import { CourseList } from "./course/list";
import { CourseEdit } from "./course/edit";

const dataProvider = simpleRestProvider("/api");

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
    </Admin>
  );
}

export default App;

import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export function UnitList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="description" />
        <TextField source="title" />
        <ReferenceField source="courseId" reference="courses" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
}

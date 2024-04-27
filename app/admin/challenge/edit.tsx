import {
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export function ChallengeEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="question"
          validate={[required()]}
          label="Question"
        />
        <SelectInput
          source="type"
          validate={[required()]}
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
        />
        <ReferenceInput source="lessonId" reference="lessons" />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Edit>
  );
}
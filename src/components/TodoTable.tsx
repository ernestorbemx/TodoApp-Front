
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";

export function TodoTable() {

    return     <Table aria-label="Example static collection table">
    <TableHeader>
      <TableColumn><Checkbox /></TableColumn>
      <TableColumn>Name</TableColumn>
      <TableColumn>Priority</TableColumn>
      <TableColumn>Due Date</TableColumn>
      <TableColumn>Actions</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow key="1">
        <TableCell><Checkbox /></TableCell>
        <TableCell>Develop App</TableCell>
        <TableCell>High</TableCell>
        <TableCell>Tomorrow</TableCell>
        <TableCell><Button>Edit</Button>
        <Button>Delete</Button></TableCell>
      </TableRow>
     
    </TableBody>
  </Table>
}
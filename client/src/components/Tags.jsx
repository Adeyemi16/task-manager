import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function Tags() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <hr />
          <SelectItem value="Urgent">Urgent</SelectItem>
          <SelectItem value="Important">Important</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

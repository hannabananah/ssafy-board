import { useState } from "react";

export default function useLoginForm() {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, onChange] as const;
}

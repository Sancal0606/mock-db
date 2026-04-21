"use client";

import { useId, type ChangeEvent } from "react";

type ItemBoxProps = {
  text: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export default function ItemBox({ text, checked, onCheckedChange }: ItemBoxProps) {
  const id = useId();
  const controlled = checked !== undefined;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onCheckedChange?.(e.target.checked);
  }

  return (
    <div className="flex items-center gap-2 rounded-sm border bg-primary p-2 text-primary-foreground">
      <input
        id={id}
        type="checkbox"
        className="size-4 shrink-0 cursor-pointer rounded border border-primary-foreground/40 accent-primary-foreground"
        {...(controlled
          ? { checked, onChange: handleChange }
          : { defaultChecked: false, onChange: handleChange })}
      />
      <label htmlFor={id} className="min-w-0 cursor-pointer select-none">
        {text}
      </label>
    </div>
  );
}

import React from 'react';

function RadInput({ onChange, children, ...props }) {
  return (
    <input
      onChange={event => onChange(event.target.value)}
      {...props}
    >
      {children}
    </input>
  )
}

function RadSelect({ onChange, children, ...props }) {
  return (
    <select
      onChange={event => onChange(event.target.value)}
      {...props}
    >
      {children}
    </select>
  )
}

export { RadInput, RadSelect };

/*
--- Name ideas ---

RadInput
RadSelect
RadCheckbox

Rad
Neat
Ex
Zig
Nice
Fun
Sick
Cool
Rad
Good
Slick
Zap
Zag
*/

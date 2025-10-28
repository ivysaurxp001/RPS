export function printProperty(name: string, value: unknown) {
  let displayValue: string;

  if (typeof value === "boolean") {
    return printBooleanProperty(name, value);
  } else if (typeof value === "string" || typeof value === "number") {
    displayValue = String(value);
  } else if (typeof value === "bigint") {
    displayValue = String(value);
  } else if (value === null) {
    displayValue = "null";
  } else if (value === undefined) {
    displayValue = "undefined";
  } else {
    displayValue = JSON.stringify(value);
  }
  return (
    <p className="text-gray-300 mb-2">
      <span className="text-cyan-400 font-semibold">{name}:</span>{" "}
      <span className="font-mono font-semibold text-white bg-gray-800/50 px-2 py-1 rounded">{displayValue}</span>
    </p>
  );
}

export function printBooleanProperty(name: string, value: boolean) {
  if (value) {
    return (
      <p className="text-gray-300 mb-2">
        <span className="text-cyan-400 font-semibold">{name}:</span>{" "}
        <span className="font-mono font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded">true</span>
      </p>
    );
  }

  return (
    <p className="text-gray-300 mb-2">
      <span className="text-cyan-400 font-semibold">{name}:</span>{" "}
      <span className="font-mono font-semibold text-red-400 bg-red-500/20 px-2 py-1 rounded">false</span>
    </p>
  );
}

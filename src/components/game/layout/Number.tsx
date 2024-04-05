import Text from "../../ui/text";

type Props = {
  value: number;
  maxDigitLength: number;
};
const Number = ({ value, maxDigitLength }: Props) => {
  const spaceCount = maxDigitLength - value.toString().length;
  const numberValue = `${" ".repeat(spaceCount)}${value}`;
  return (
    <div className={`grid grid-flow-col grid-cols-${value.toString().length}`}>
      {numberValue
        .toString()
        .split("")
        .map((digit, index) => (
          <Text key={index} className="w-8 text-center text-5xl font-bold">
            {digit}
          </Text>
        ))}
    </div>
  );
};

export default Number;

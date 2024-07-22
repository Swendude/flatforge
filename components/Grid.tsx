const Grid = ({ size, step }: { size: number; step: number }) => {
  const lines = (
    from: number,
    to: number,
    step: number,
    vertical: boolean = false,
    width: number = 0.2,
    className: string = "stroke-background",
  ) => {
    let result = [];
    for (let pos = from; pos <= to; pos += step) {
      result.push(
        <line
          className={className}
          key={pos}
          y1={vertical ? -size * 0.5 : pos}
          y2={vertical ? size * 0.5 : pos}
          x1={vertical ? pos : -size * 0.5}
          x2={vertical ? pos : size * 0.5}
          strokeWidth={width}
        />,
      );
    }
    return result;
  };

  return (
    <g>
      {lines(-size * 0.5, size * 0.5, step)}
      {lines(-size * 0.5, size * 0.5, step, true)}
      {lines(
        -size * 0.5,
        size * 0.5,
        size * 0.5,
        false,
        0.3,
        "stroke-background",
      )}
      {lines(
        -size * 0.5,
        size * 0.5,
        size * 0.5,
        true,
        0.3,
        "stroke-background",
      )}
    </g>
  );
};

export default Grid;

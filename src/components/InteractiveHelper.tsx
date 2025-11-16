type InteractiveHelperProps = {
  hoveredElement: string | null;
};

const InteractiveHelper = ({ hoveredElement }: InteractiveHelperProps) => {
  if (!hoveredElement) return null;

  return (
    <div className="absolute z-50 right-5 bottom-5 flex justify-center pointer-events-none">
      <div className="hologram py-2 px-4">
        <p className="hologram-text text-xl">{hoveredElement}</p>
      </div>
    </div>
  );
};

export default InteractiveHelper;

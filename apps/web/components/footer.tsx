export const Footer = () => {
  return (
    <div className="grow bg-black/10 py-10">
      <div className="container">
        <div className="text-sm font-semibold">
          <span className="text-foreground/50">
            ©{new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

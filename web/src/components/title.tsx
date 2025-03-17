export const Title: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <h1 className="text-4xl font-bold">
    Burger <span className="text-orange-400">Bár</span> - {children}
  </h1>
);

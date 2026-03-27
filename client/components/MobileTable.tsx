import { ReactNode } from "react";

interface MobileTableProps {
  title: string;
  headers: string[];
  children: ReactNode;
}

export function MobileTable({ title, headers, children }: MobileTableProps) {
  return (
    <>
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
        {title}
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-2 font-semibold text-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}

interface MobileCardRowProps {
  children: ReactNode;
}

export function MobileCardRow({ children }: MobileCardRowProps) {
  return <>{children}</>;
}

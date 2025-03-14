import { PAGE_QUERYResult } from "@/sanity/types";

type LogoProps = NonNullable<PAGE_QUERYResult>["logo"];

export function Logo({ default: defaultLogo, light, dark, name, title }: LogoProps) {
  console.log({ defaultLogo, light, dark }, "Logo Data"); // Debugging

  return (
    <div className="flex gap-4 items-center">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}

      {defaultLogo?.url && (
        <img src={defaultLogo.url} alt={`${name} - Default`} className="w-24 h-auto" />
      )}
      {light?.url && (
        <img src={light.url} alt={`${name} - Light`} className="w-24 h-auto" />
      )}
      {dark?.url && (
        <img src={dark.url} alt={`${name} - Dark`} className="w-24 h-auto" />
      )}
    </div>
  );
}
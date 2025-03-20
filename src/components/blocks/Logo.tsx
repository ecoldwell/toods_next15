import Image from "next/image";

type LogoProps = {
    name?: string;
    default?: string;
    light?: string;
    dark?: string;
  };
  
  export function Logo({ name, default: defaultLogo, light, dark }: LogoProps) {
    return (
      <div className="flex gap-4 items-center thisislogo">
        {/* {name && <h2 className="text-lg font-semibold">{name}</h2>} */}
        {defaultLogo && (
          <Image src={defaultLogo} alt={`${name} - Default`} className="h-auto" 
          width={400}
          height={400}/>
        )}
        {/* {light && (
          <Image src={light} alt={`${name} - Light`} className="w-24 h-auto"  width={400}
          height={400} />
        )}
        {dark && (
          <Image src={dark} alt={`${name} - Dark`} className="w-24 h-auto"  width={400}
          height={400}/>
        )} */}
      </div>
    );
  }
  
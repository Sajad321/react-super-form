import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export type InputIconProps = {
  icon: string | React.ReactNode;
  error?: string;
  register?: any;
  name?: string;
  className?: string;
  divClassName?: string;
  label?: string;
  innerIcon?: React.ReactNode;
  rows?: number;
  note?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputIcon({
  icon,
  error,
  type,
  register = () => {},
  name,
  className,
  divClassName,
  label,
  innerIcon,
  rows = 1,
  note,
  ...rest
}: InputIconProps) {
  const { i18n } = useTranslation();
  if (!register) {
    return <></>;
  }

  return (
    <>
      {label && (
        <label
          className={`block ${
            i18n.language === "ar" ? "text-right" : "text-left"
          } text-md font-medium text-[#4B4F58] my-1`}
          dir={i18n.dir()}
        >
          {label}
        </label>
      )}
      {note && <p className="text-sm text-new-primary text-start">{note}</p>}
      <div className={cn("flex flex-col gap-2", divClassName)}>
        <div
          className={cn(
            `flex w-full px-4 items-center ${
              rows && rows > 1 ? "rounded-md" : "rounded-full"
            } border border-input bg-[#F8F8F8] pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2`,
            {
              "border-red-500": error,
            }
          )}
        >
          {icon && typeof icon === "string" ? (
            <img src={icon} alt="searchIcon" />
          ) : (
            icon
          )}
          {rows && rows > 1 ? (
            <textarea
              {...register(name)}
              {...rest}
              maxLength={190}
              rows={rows ?? 1}
              className={`w-full bg-[#F8F8F8] p-2 
                            rounded-md
                            placeholder:text-muted-foreground 
                            placeholder:text-gray-400 
                            focus-visible:outline-none 
                            disabled:cursor-not-allowed disabled:opacity-50
                            overflow-y-auto overflow-hidden 
                            resize-none
                            overflow-x-hidden
                        ${className}}
                    `}
            />
          ) : (
            <input
              {...register(name)}
              {...rest}
              type={type}
              className={cn(
                `w-full
                                 bg-[#F8F8F8] p-2 
                                    placeholder:text-muted-foreground 
                                    placeholder:text-gray-400  
                                    focus-visible:outline-none 
                                    disabled:cursor-not-allowed disabled:opacity-50`,
                className
              )}
            />
          )}

          {innerIcon && innerIcon}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </>
  );
}

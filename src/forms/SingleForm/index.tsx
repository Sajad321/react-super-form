import { SingleFormConfig } from "../types";

export function SingleForm({
  config,
  onSubmit,
}: {
  config: SingleFormConfig;
  onSubmit: (values: Record<string, any>) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());
        onSubmit(values);
      }}
    >
      <div>
        {config.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input type={field.type} name={field.name} />
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

import React from 'react';
import { Controller } from 'react-hook-form';

function RadioField({
    serviceType,
    label,
    upperField,
    form,
    updateConstraints,
    t,
}: {
    serviceType: string;
    label: string;
    upperField: any;
    form: any;
    updateConstraints: any;
    t: any;
}) {
    return (
        <div className="flex flex-col justify-start items-start">
            <p className={`mb-0 mt-0 text-l whitespace-nowrap`}>{label}</p>
            {upperField.flexCol ? (
                <div className={`flex flex-col justify-start items-start my-2`}>
                    {upperField.options?.map((option: any) => (
                        <div className="flex flex-col justify-start items-start">
                            <label className="inline-flex items-center space-x-2 ml-4">
                                <Controller
                                    key={upperField.name}
                                    name={upperField.name}
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <input
                                                type="radio"
                                                value={option.value}
                                                checked={field.value === option.value}
                                                onChange={field.onChange}
                                                className="mr-2"
                                                disabled={!updateConstraints.canUpdateData}
                                            />
                                        );
                                    }}
                                />
                                <span className="px-2">{t(`${serviceType}.${option.label}`)}</span>
                            </label>
                            <p className="text-sm text-gray-500">
                                {t(`${serviceType}.${option.details}`)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`flex flex-wrap justify-start items-start mt-2`}>
                    {upperField.options?.map((option: any) => (
                        <label className="mb-2 inline-flex items-center space-x-2 ml-4">
                            <Controller
                                key={upperField.name}
                                name={upperField.name}
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <input
                                            type="radio"
                                            value={option.value}
                                            checked={field.value === option.value}
                                            onChange={field.onChange}
                                            className="mr-2"
                                            disabled={!updateConstraints.canUpdateData}
                                        />
                                    );
                                }}
                            />
                            <span className="px-2">{t(`${serviceType}.${option.label}`)}</span>
                        </label>
                    ))}
                </div>
            )}
            {form.formState.errors[upperField.name]?.message && (
                <p className="text-red-500">
                    {String(form.formState.errors[upperField.name]?.message)}
                </p>
            )}
        </div>
    );
}

export default RadioField;

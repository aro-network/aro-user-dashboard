import { Btn } from "@/components/btns";
import { TitModal } from "@/components/dialogs"
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { FC } from "react"
import { useForm } from "react-hook-form";


const egionList = [
  { label: 'China Region1', key: 'region1' },
  { label: 'China Region2', key: 'region2' },
  { label: 'China Region3', key: 'region3' },
]

const AModal: FC<EdgeNodeMode.AModalProps> = ({ isOpen, onCloseModal, onSubmit }) => {
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();



  return <TitModal isOpen={isOpen} onClose={onCloseModal} tit="Add New Node">
    <div className="flex flex-col justify-start items-center self-stretch gap-2.5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className=" flex gap-5 flex-col">
          <div>
            <label className="text-xs ">
              Set Activation Code
            </label>
            <Input
              maxLength={10}
              type="text"
              className="w-full mt-[.3125rem]"
              placeholder={"Activation Code"}
              {...register('code', {
              })}
            />
          </div>
          <div>
            <label className="text-xs ">
              Set Node Name & Region
            </label>
            <Input
              maxLength={10}
              type="text"
              className="w-full mt-[.3125rem]"
              placeholder={"Node Name"}
              {...register('name', {
              })}
            />
            <Select className="h-11 mt-[.625rem]" label="Select an region"  {...register('region', {
            })}>
              {egionList.map((animal) => (
                <SelectItem className="h-11" key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>

          </div>
          <Checkbox ><label className=" ml-[.375rem] mt-5 text-xs">I have read and agree upon <label className="underline-offset-4 underline">Term of Service</label> and<label className="underline-offset-4 underline"> Privacy Policy.</label></label></Checkbox>
          <div className="flex justify-center">
            <Btn className="h-8 w-[15.625rem] flex justify-center"  >Add New Node</Btn>
          </div>

        </div>
      </form>

    </div>

  </TitModal>

}
export default AModal
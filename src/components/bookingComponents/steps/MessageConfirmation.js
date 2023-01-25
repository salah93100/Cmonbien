import { CheckIcon } from '@chakra-ui/icons';

const MessageConfirmation = ({
  children,
  booking,
  setBooking,
  register,
  errors,
}) => {
  return (
    <div className="w-full h-full flex items-center  p-2 md:p-5 bg-[#005c7c] rounded-md border border-1 border-white align-i gap-2 md:gap-4">
      <CheckIcon color="white" size={50} />
      <p className="text-start text-white text-sm">
        Votre Devis a bien été envoyé. Nous vous recontacterons dans les plus
        brefs délais.
      </p>
    </div>
  );
};

export default MessageConfirmation;

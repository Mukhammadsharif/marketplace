import {
    Button,
    Card,
    CardBody,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import React, {useEffect} from "react";
import {useTranslationClient} from "@/app/i18n/client";

export function Modal({ modal, setModal, text, lng}) {
    const { t } = useTranslationClient(lng);

    useEffect(() => {
        setTimeout(() => setModal(!modal), 3000);
    }, [])

    return (
        <section style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            <div className="w-full px-4">
                <div className="grid h-screen place-items-center">
                    <Card className="max-w-xl">
                        <CardBody>
                            <div className="flex w-full justify-end">
                                <IconButton variant="text" onClick={() => setModal(!modal)}>
                                    <i className="fas fa-close text-xl"></i>
                                </IconButton>
                            </div>
                            <div className="text-center px-6">
                                <Typography
                                    color="blue-gray"
                                    className="mb-6 mt-10"
                                    variant="h4"
                                >
                                    {t('notification')}
                                </Typography>
                                <Typography className="text-[20px] font-normal text-gray-500">
                                    {text}
                                </Typography>
                                <Button size="lg" className="mt-8" onClick={() => setModal(!modal)}>
                                    {t('close')}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default Modal;

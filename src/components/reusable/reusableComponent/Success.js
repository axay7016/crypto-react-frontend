import React from 'react'
import { useTranslation } from 'react-i18next';

const Success = ({ successMessage }) => {
    const { t } = useTranslation(["common"]);

    return (
        <div className="alert alert-success" role="alert">
            <strong className="mx-2">{t("success")}</strong> {successMessage}
        </div>
    )
}

export default Success
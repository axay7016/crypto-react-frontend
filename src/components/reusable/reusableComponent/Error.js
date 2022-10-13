import React from 'react'
import { useTranslation } from 'react-i18next';

const Error = ({ errorMessage }) => {
    const { t } = useTranslation(["common"]);
    return (
        <div className="alert alert-danger mt-2" role="alert">
            <strong className="mx-2">{t("error")}</strong> {errorMessage}
        </div>
    )
}

export default Error
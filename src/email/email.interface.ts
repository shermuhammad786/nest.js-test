/* eslint-disable prettier/prettier */
export interface MailService {
    /**
     * @description Send email
     */
    sendMail(content): Promise<void>;

    //   /**
    //    * @description Send email sandbox
    //    */
    //   sendMailSandBox(content: Object): Promise<void>;
}

import PGconnector from "../postgresConnect";

const SaveLogPG = async (firstLog: string, lastLog: string): Promise<void> => {
    try {
        await PGconnector.query(
            `
            insert into csv_files (
                upload_date,
                first_entry_date,
                last_entry_date
            ) values (
                $1, $2, $3
            )
            `,
            ['now', firstLog, lastLog]
        );
    } catch(err: any){
        console.log(err);
    }
}

export { SaveLogPG }
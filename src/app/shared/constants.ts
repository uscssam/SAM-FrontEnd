import { environment } from "src/environments/environment";
import { Option } from "../interfaces/option";
import { ProfileLevelEnum } from "../enums/profile-level.enum";
import { SpecialityEnum } from "../enums/speciality.enum";

export class Constants {
    constructor() {}

    static Login = environment.baseUrlApi + 'login';
    static Levels = <Option[]>[
        { label: 'Atendente', code: ProfileLevelEnum.Employee.toString() },
        { label: 'Técnico', code: ProfileLevelEnum.Technician.toString() },
        { label: 'Gerente', code: ProfileLevelEnum.Manager.toString() },
    ]
    static Specialities = <Option[]>[
        { label: 'Não se aplica', code: null },
        { label: 'Eletricista', code: SpecialityEnum.Eletric.toString() },
        { label: 'Mecânico', code: SpecialityEnum.Mechanic.toString() },
    ]
}
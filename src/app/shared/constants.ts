import { environment } from "src/environments/environment";
import { Option } from "../interfaces/option";
import { ProfileLevelEnum } from "../enums/profile-level.enum";
import { SpecialityEnum } from "../enums/speciality.enum";
import { StatusMachineEnum } from "../enums/status-machine.enum";

export class Constants {
    constructor() {}

    static login = environment.baseUrlApi + 'Login/';
    static user = environment.baseUrlApi + 'User/'
    static machine = environment.baseUrlApi + 'Machine/'

    static Levels = <Option[]>[
        { label: 'Atendente', code: ProfileLevelEnum.Atendente.toString() },
        { label: 'Técnico', code: ProfileLevelEnum.Técnico.toString() },
        { label: 'Gerente', code: ProfileLevelEnum.Gerente.toString() },
    ]
    static Specialities = <Option[]>[
        { label: 'Não se aplica', code: null },
        { label: 'Eletricista', code: SpecialityEnum.Elétrico.toString() },
        { label: 'Mecânico', code: SpecialityEnum.Mecânico.toString() },
    ]
    static Status = <Option[]>[
        { label: 'Ativa', code: StatusMachineEnum.Ativa.toString() },
        { label: 'Parada', code: StatusMachineEnum.Parada.toString() },
    ]
}
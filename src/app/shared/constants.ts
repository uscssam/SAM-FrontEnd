import { environment } from "src/environments/environment";
import { Option } from "../interfaces/option";
import { ProfileLevelEnum, ProfileLevelEnumDescriptions } from "../enums/profile-level.enum";
import { SpecialityEnum, SpecialityEnumDescriptions } from "../enums/speciality.enum";
import { StatusMachineEnum, StatusMachineEnumDescriptions } from "../enums/status-machine.enum";

export class Constants {
    constructor() { }

    static login = environment.baseUrlApi + 'Login/';
    static user = environment.baseUrlApi + 'User/'
    static machine = environment.baseUrlApi + 'Machine/'

    static Levels = <Option[]>[
        { label: ProfileLevelEnumDescriptions[ProfileLevelEnum.Employee], code: ProfileLevelEnum.Employee },
        { label: ProfileLevelEnumDescriptions[ProfileLevelEnum.Technician], code: ProfileLevelEnum.Technician },
        { label: ProfileLevelEnumDescriptions[ProfileLevelEnum.Manager], code: ProfileLevelEnum.Manager },
    ]
    static Specialities = <Option[]>[
        { label: 'Não se aplica', code: null },
        { label: SpecialityEnumDescriptions[SpecialityEnum.Electric], code: SpecialityEnum.Electric },
        { label: SpecialityEnumDescriptions[SpecialityEnum.Mechanic], code: SpecialityEnum.Mechanic },
    ]
    static Status = <Option[]>[
        { label: StatusMachineEnumDescriptions[StatusMachineEnum.Active], code: StatusMachineEnum.Active },
        { label: StatusMachineEnumDescriptions[StatusMachineEnum.Inactive], code: StatusMachineEnum.Inactive },
        { label: StatusMachineEnumDescriptions[StatusMachineEnum.Maintenance], code: StatusMachineEnum.Maintenance },
    ]
}

import { environment } from "src/environments/environment";
import { Option } from "../interfaces/option";
import { ProfileLevelEnum, ProfileLevelEnumDescriptions } from "../enums/profile-level.enum";
import { SpecialityEnum, SpecialityEnumDescriptions } from "../enums/speciality.enum";
import { StatusMachineEnum, StatusMachineEnumDescriptions } from "../enums/status-machine.enum";
import { StatusOrderServiceEnum, StatusOrderServiceEnumDescriptions } from "../enums/status-order-service.enum";

export class Constants {
    constructor() { }

    static login = environment.baseUrlApi + 'Login/';
    static user = environment.baseUrlApi + 'User/'
    static order = environment.baseUrlApi + 'OrderService/'
    static machine = environment.baseUrlApi + 'Machine/'
    static unit = environment.baseUrlApi + 'Unit/'
    static cep = environment.baseCepUrl + 'ws/'

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
    static StatusOrderService = <Option[]>[
        { label: StatusOrderServiceEnumDescriptions[StatusOrderServiceEnum.Open], code: StatusOrderServiceEnum.Open },
        { label: StatusOrderServiceEnumDescriptions[StatusOrderServiceEnum.InProgress], code: StatusOrderServiceEnum.InProgress },
        { label: StatusOrderServiceEnumDescriptions[StatusOrderServiceEnum.Impeded], code: StatusOrderServiceEnum.Impeded },
        { label: StatusOrderServiceEnumDescriptions[StatusOrderServiceEnum.Completed], code: StatusOrderServiceEnum.Completed },
    ]
}

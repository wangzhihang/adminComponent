export const text = (msg = '文本不能为空', required = true) => ([
    { required, message: msg, trigger: 'blur' },
])

export const name = (msg = '姓名不能为空', min = 2, max = 10, required = true) => ([
    { required, message: msg, trigger: 'blur' },
    { min, max, message: `长度在${min}~${max}个字符`, trigger: 'blur' }
])

export const idCard = (msg = '身份证不能为空', required = true, type, len = 18) => ([
    { required, message: msg, trigger: 'blur' },
    { required, message: `长度必须是${len}个数字`, len: len, trigger: 'blur' }
])

export const tel = (msg = '电话号码不能为空', required = true, len = 11) => ([
    { required, message: msg, trigger: 'blur' },
    { message: `长度必须是${len}个数字`, len: len, trigger: 'blur' }
])

export const url = (msg = 'url不能为空', required = true, type = "url") => ([
    { required, message: msg, trigger: 'blur' },
    { type: type, message: '输入类型必须是url类型', trigger: 'blur' }
])

export const email = (msg = '邮件地址不能为空', required = true, type = "email") => ([
    { required, message: msg, trigger: 'blur' },
    { type: type, message: '输入类型必须是email类型', trigger: 'blur' }
])

export const number = (msg = '输入数字不能为空', required = true, type = "number") => ([
    { required: required, type: type, message: msg, trigger: 'blur' }
])

export const password = (msg = '密码不能为空', min = 6, max = 20, required = true) => ([
    { required, message: msg, trigger: 'blur' },
    { min, max, message: `长度应在${min}~${max}个字符`, trigger: 'blur' }
])

export const select = (msg = '请选择', required = true) => ([
    { required: true, message: msg, trigger: 'change' }
])

export const selectMultipy = (msg = '请至少选择一个', required = true) => ([
    { required: required, type: 'array', min: 1, message: msg, trigger: 'change' }
])

export const radio = (msg = '请选择一个', required = true) => ([
    { required: true, message: msg, trigger: 'change' }
])

export const checkbox = (msg = '请至少选择一个', required = true) => ([
    { required: required, type: 'array', min: 1, message: msg, trigger: 'change' }
])

export const dateTime = (msg = '请选择日期', required = true) => (
    [
        { required: required, type: 'date', message: msg, trigger: 'change' }
    ]
)
export const dateTimeRange = (msg = '请选择日期范围', required = true) => (
    [{
        required: true,
        type: 'array',
        fields: {
            0: { required: true, type: 'date', message: '请选择时间范围', trigger: 'change' },
            1: { required: true, type: 'date', message: '请选择时间范围', trigger: 'change' }
        },
        trigger: 'change'
    }]
)




// import schema from 'async-validator'
// export const FormValidate = () => {
// var descriptor = {
//     name: {
//         required: true,
//         message: 'The name cannot be empty',
//         trigger: 'blur'
//     }
// };
// var validator = new schema(descriptor);
// validator.validate({ name: "" }, (errors, fields) => {
//     if (errors) {
//         console.log('failed==' + JSON.stringify(fields))
//         return fields
//     }
//     return ''
// });
// }
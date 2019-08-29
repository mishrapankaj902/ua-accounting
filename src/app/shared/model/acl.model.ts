import * as _ from 'lodash'
export class AclModel {
    protected rolesPermission = [
        {
            role: 'client',
            permissions: [
                'isClient'
                // 'create_deal',
                // 'basic_info',
                // 'choose_form'
            ],
            permitRoutes: [
                
            ]
        }
    ]

    public getPermission(role?: string | string[]) {
        let permissions = [];
        if (_.isString(role)) {
            role = ['role']
        }
        _.forEach(role, (v) => {
            const temp = _.findIndex(this.rolesPermission, ['role', v])
            if (temp !== -1) {
                permissions = _.merge(permissions, this.rolesPermission[temp].permissions)
            }
        })
        return permissions;
    }
}

from alembic import op


def add_starting_data(auth_lab, auth_role, auth_user, auth_user_role):
    op.bulk_insert(auth_lab, [
        {
            'id': 0,
            'name': 'Genomic Predictions Laboratory',
            'description': 'Default Lab'
        }
    ])

    op.bulk_insert(auth_role, [
        {
            'id': 1,
            'lab_id': 0,
            'role_name': 'Super User',
            'role_description': 'Genomic Staff Only',
            'install_gbox': True,
            'access_gseq': True,
            'access_epgt': True,
            'gseq_curate_results': True,
            'gseq_view_reports': True,
            'gseq_export_reports': True,
            'epgt_curate_results': True,
            'epgt_view_reports': True,
            'epgt_export_reports': True
        },
        {
            'id': 2,
            'lab_id': 0,
            'role_name': 'Lab Admin',
            'role_description': 'Lab Admin',
            'install_gbox': True,
            'access_gseq': True,
            'access_epgt': False,
            'gseq_curate_results': True,
            'gseq_view_reports': True,
            'gseq_export_reports': True,
            'epgt_curate_results': False,
            'epgt_view_reports': False,
            'epgt_export_reports': False
        },
        {
            'id': 3,
            'lab_id': 0,
            'role_name': 'Lab Staff',
            'role_description': 'Lab Staff',
            'install_gbox': True,
            'access_gseq': True,
            'access_epgt': False,
            'gseq_curate_results': True,
            'gseq_view_reports': True,
            'gseq_export_reports': True,
            'epgt_curate_results': False,
            'epgt_view_reports': False,
            'epgt_export_reports': False
        }
    ])

    op.bulk_insert(auth_user, [
        {
            'id': 1,
            'first_name': 'Rich',
            'last_name': 'Wandell',
            'lab_id': 0,
            'username': 'richwandell',
            'password_hash': 'pbkdf2:sha512:150000$Q98iV0OD$48689792451525acd08a9c8d0af871e7f1a88ca2327ebdfad075b7fe754f2419bbb45aa846841c2e27bce102e03603537120ba3f41efd3641673b1ba7af12082',
            'email': 'rich@genomicprediction.com'
        }
    ])

    op.bulk_insert(auth_user_role, [
        {
            'user_id': 1,
            'role_id': 1
        }
    ])

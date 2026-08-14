"""add email_verified for users model

Revision ID: 6acd6788b564
Revises: baf74e5808dd
Create Date: 2026-08-14 17:18:05.311352

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6acd6788b564'
down_revision: Union[str, Sequence[str], None] = 'baf74e5808dd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'users',
        sa.Column(
            'is_email_verified',
            sa.Boolean(),
            nullable=False,
            server_default=sa.false()
        )
    )

    op.alter_column(
        'users',
        'is_email_verified',
        server_default=None
    )


def downgrade() -> None:
    op.drop_column('users', 'is_email_verified')

import React, { ReactNode, useEffect, useRef, useState, CSSProperties } from 'react'

import { IconButton, Menu, MenuItem, MenuProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { NestedMenuItem } from 'mui-nested-menu'

import { excludeProps } from '../../styles/utils'
import { StyledMoreVertIcon } from '../icons/MoreVertIcon'

export interface CommonExpandableMenuProps {
  renderContent: (onClose: (event?: Event) => void, closeMenu: () => void) => React.ReactNode
  transformPosition?: boolean
  anchorRight?: boolean
  transformRight?: boolean
  renderTrigger?: (onClick: (event: React.MouseEvent<HTMLButtonElement>) => void, isOpen: boolean) => ReactNode
  buttonTrigger?: ReactNode
  btnClass?: string
  iconSize?: 'small' | 'medium' | 'tiny'
  iconBackground?: string
  disableRipple?: boolean
  icon?: ReactNode
  handleCloseEffects?: () => void
  disableScrollLock?: boolean
  forceOpen?: boolean
  MenuProps?: Partial<MenuProps>
  extraButtonProps?: Record<string, string | boolean>
}

const CommonExpandableMenu: React.FC<CommonExpandableMenuProps> = (props) => {
  const {
    renderContent,
    // transformPosition,
    anchorRight,
    transformRight = true,
    renderTrigger,
    // btnClass,
    // iconSize,
    iconBackground,
    disableRipple,
    icon,
    handleCloseEffects,
    disableScrollLock,
    forceOpen,
    MenuProps = {},
    extraButtonProps,
  } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = anchorEl !== null
  const defaultTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (forceOpen) {
      setAnchorEl(defaultTriggerRef?.current || null)
    }
  }, [forceOpen])

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
    if (handleCloseEffects) {
      handleCloseEffects()
    }
  }

  // todo
  const onClose = (event?: Event) => {
    event?.stopPropagation()
    event?.preventDefault()
    closeMenu()
  }

  return (
    <>
      {renderTrigger ? (
        renderTrigger(onClick, anchorEl !== null)
      ) : (
        <IconButton
          onClick={onClick}
          // todo
          /* className={clsx(classes.openButton, {
            [classes[btnClass]]: btnClass,
            [classes.isOpen]: open,
            [classes[iconSize]]: iconSize,
          })} */
          sx={{ background: iconBackground || 'transparent' }}
          disableFocusRipple={disableRipple}
          disableRipple={disableRipple}
          ref={defaultTriggerRef}
          data-menu-open={open}
          {...(extraButtonProps ?? {})}
        >
          {icon || <StyledMoreVertIcon />}
        </IconButton>
      )}
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => onClose()}
        disableScrollLock={disableScrollLock}
        // todo
        // classes={{
        //   root: clsx(classes.menuPaper, transformPosition ? classes.transformPosition : null),
        //   paper: classes.menuPaper,
        // }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: anchorRight ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: transformRight ? 'right' : 'left',
        }}
        {...MenuProps}
      >
        {renderContent(onClose, closeMenu)}
      </Menu>
    </>
  )
}

export const CommonMenu = {
  Item: styled(MenuItem, {
    shouldForwardProp: excludeProps(['danger', 'greyed', 'withBigSpacing']),
  })<{
    danger?: boolean
    withBigSpacing?: boolean
    grayed?: boolean
    customItemStyles?: CSSProperties
  }>(({ theme, danger, withBigSpacing, grayed, customItemStyles }) => ({
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '400',
    justifyContent: 'flex-start',
    gap: '1rem',
    ...customItemStyles,
    ...(danger && {
      color: theme.palette.error[600],
    }),
    ...(grayed && {
      color: theme.palette.grey[600],
    }),
    ...(withBigSpacing && {
      padding: '10px 12px',
      '&:not(:last-of-type)': {
        marginBottom: '8px',
      },
    }),
    '&.Mui-selected': {
      backgroundColor: theme.palette.grey[75],
      display: 'flex',
      justifyContent: 'space-between',
    },
  })),
  NestedItem: styled(NestedMenuItem)(({ theme }) => ({
    margin: '4px 8px',
    borderRadius: '6px',
    p: {
      fontSize: '14px',
      color: theme.palette.grey[900],
    },
  })),
  ItemText: styled('span', { shouldForwardProp: excludeProps(['greyed', 'small']) })<{
    greyed?: boolean
    small?: boolean
  }>(({ theme, greyed, small }) => ({
    fontSize: '14px',
    ...(greyed && {
      color: theme.palette.grey[600],
    }),
    ...(small && {
      fontSize: '12px',
    }),
  })),
  Divider: styled('hr')(({ theme }) => ({
    margin: '8px 0',
    border: 0,
    borderBottom: '1px solid ' + theme.palette.grey[100],
  })),
}

export default CommonExpandableMenu

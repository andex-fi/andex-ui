import React, { useState } from 'react'
import { Box, CopyIcon, FlexProps, IconButton } from '@andex/uikit'
import { Wrapper, Text, Tooltip } from './styles'

interface CopyProps extends FlexProps {
  text: string
}

const CopyToClipboard: React.FC<CopyProps> = ({ text, ...props }) => {
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

    function displayTooltip() {
        setIsTooltipDisplayed(true)
        setTimeout(() => {
          setIsTooltipDisplayed(false)
        }, 1000)
    }

    const copyText = () => {
        if (navigator.clipboard && navigator.permissions) {
            navigator.clipboard.writeText(text).then(() => displayTooltip())
        } else if (document.queryCommandSupported('copy')) {
            const ele = document.createElement('textarea')
            ele.value = text
            document.body.appendChild(ele)
            ele.select()
            document.execCommand('copy')
            document.body.removeChild(ele)
            displayTooltip()
        }
    }

    return (
        <Box position="relative" {...props}>
            <Wrapper>
                <Text title={text}>
                    <input type="text" readOnly value={text} />
                </Text>
                <IconButton variant="text" onClick={copyText}>
                    <CopyIcon color="primary" width="24px" />
                </IconButton>
            </Wrapper>
            <Tooltip isTooltipDisplayed={isTooltipDisplayed}>{'Copied'}</Tooltip>
        </Box>
    )
}

export default CopyToClipboard
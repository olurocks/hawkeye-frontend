import { Box } from '@mui/system'

import { GridColors } from './colors'
import { comicFonts } from '../../utils/comicFonts'

const Pow = () => {
    const comicColors = GridColors()
  return (
            <Box
          sx={{
            position: "absolute",
            top: "-30px",
            right: "-20px",
            width: "100px",
            height: "100px",
            backgroundColor: comicColors.red,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "rotate(15deg)",
            border: `4px solid ${comicColors.black}`,
            boxShadow: `3px 3px 0px ${comicColors.black}`,
            zIndex: 2,
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: comicFonts.title,
              fontSize: "24px",
              color: comicColors.offWhite,
              textShadow: `2px 2px 0px ${comicColors.black}`,
              transform: "rotate(-5deg)",
            }}
          >
            POW!
          </Box>
        </Box>
  )
}

export default Pow

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { normalizeImageName } from '../../helpers/utils';

const StuffCharacteristicsAccordion = ({ section, title, stats = [], ...props }) => {
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${section}-content`} id={`${section}-header`}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <hr />
      <AccordionDetails className="stat-section">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-line">
            <div>
              <img
                src={`/images/ui/stats/${normalizeImageName(stat.name)}.png`}
                alt={stat.name}
                className="icon"
                width={24}
                height={24}
              />
              {stat.name}
            </div>
            <div>{stat.value + ''}</div>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
export default StuffCharacteristicsAccordion;

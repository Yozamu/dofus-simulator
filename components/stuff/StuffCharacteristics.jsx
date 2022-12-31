import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';

const StatsAccordion = ({ section, title, stats = [], ...props }) => {
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${section}-content`} id={`${section}-header`}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className="stat-section">
        {stats.map((stat) => (
          <div key={stat} className="stat-line">
            <div>
              <Image
                src={`/images/ui/stats/${stat.replace(/[% ]/g, '').toLowerCase()}.png`}
                alt={stat}
                className="icon"
                width={24}
                height={24}
              />
              {stat}
            </div>
            <div>val</div>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const StuffCharacteristics = ({ items, characteristics, ...props }) => {
  return (
    <div className={props.className}>
      <StatsAccordion
        defaultExpanded={true}
        section="primary"
        title="Statistiques primaires"
        stats={[
          'Vie',
          'PA',
          'PM',
          'Portée',
          'Initiative',
          'Vitalité',
          'Sagesse',
          'Force',
          'Intelligence',
          'Chance',
          'Agilité',
          'Puissance',
          'Critique',
        ]}
      />
      <StatsAccordion
        section="secondary"
        title="Statistiques secondaires"
        stats={[
          'Fuite',
          'Tacle',
          'Invocations',
          'Soins',
          'Esquive PA',
          'Esquive PM',
          'Retrait PA',
          'Retrait PM',
          'Prospection',
          'Pods',
        ]}
      />
      <StatsAccordion
        section="damage"
        title="Dommages"
        stats={[
          'Dommages Neutre',
          'Dommages Terre',
          'Dommages Feu',
          'Dommages Eau',
          'Dommages Air',
          'Dommages Critiques',
          'Dommages Poussée',
          '% Dommages Armes',
          '% Dommages Sorts',
          '% Dommages Mêlée',
          '% Dommages Distance',
          'Dommages',
        ]}
      />
      <StatsAccordion
        section="resistance"
        title="Résistances"
        stats={[
          '% Résistance Neutre',
          '% Résistance Terre',
          '% Résistance Feu',
          '% Résistance Eau',
          '% Résistance Air',
          'Résistance Neutre',
          'Résistance Terre',
          'Résistance Feu',
          'Résistance Eau',
          'Résistance Air',
          'Résistance Critique',
          'Résistance Poussée',
          '% Résistance Armes',
          '% Résistance Mêlée',
          '% Résistance Distance',
        ]}
      />
    </div>
  );
};

export default styled(StuffCharacteristics)`
  width: 500px;

  .stat-section {
    display: flex;
    flex-wrap: wrap;
  }

  .stat-line {
    display: flex;
    justify-content: space-between;
    min-width: 220px;
    flex-basis: 45%;
  }

  .stat-line:nth-child(odd) {
    margin-right: auto;
  }
`;

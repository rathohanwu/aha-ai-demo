import {Grid, LinearProgress, Paper} from '@mui/material';
import {useUsersOverview} from '@/hooks/dashboard/useUsersOverview';
import Typography from '@mui/material/Typography';

function StatisticCard(props: {title: string; content?: string}) {
  const {title, content} = props;
  return (
    <Paper style={{height: 120, padding: 10}}>
      <Typography variant={'h6'}>{title} </Typography>
      <Typography variant={'h2'}>{content} </Typography>
    </Paper>
  );
}

function UserOverview() {
  const {overview, isLoading} = useUsersOverview();

  if (isLoading) return <LinearProgress />;
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StatisticCard
            title={'Total Number of Signed Up Users'}
            content={`${overview?.totalCount}`}
          />
        </Grid>
        <Grid item xs={4}>
          <StatisticCard
            title={"Total Number of Today's Active Users"}
            content={`${overview?.todayActiveCount}`}
          />
        </Grid>
        <Grid item xs={4}>
          <StatisticCard
            title={'Last Seven Day Average of Active Users'}
            content={`${overview?.lastSevenDayActiveCount.toFixed(2)}`}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default UserOverview;

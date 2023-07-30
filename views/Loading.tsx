import { Grid, Page, Spinner } from '@geist-ui/core'

export const LoadingView = () => (
  <Page dotBackdrop>
    <Grid.Container gap={2} justify="center" alignItems="center" height="100vh">
      <Grid xs={24} data-testid="spinner" justify="center">
        <Spinner scale={2} />
      </Grid>
    </Grid.Container>
  </Page>
)

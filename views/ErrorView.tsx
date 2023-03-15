import { Modal, Page, Spacer, Text } from '@geist-ui/core'
import Activity from '@geist-ui/icons/activity'

export const ErrorView = () => (
    <Page dotBackdrop>
        <Modal visible={true} onClose={() => window.location.reload()}>
            <Modal.Title>
                <Activity />
                <Spacer inline /> Unable to get properties
            </Modal.Title>
            <Modal.Content>
                <Text em data-testid="error-text">
                    We were unable to query data for the searched properties.
                    This is unexpected, please try later again.
                </Text>
            </Modal.Content>
            <Modal.Action onClick={() => window.location.reload()}>
                Retry
            </Modal.Action>
        </Modal>
    </Page>
)

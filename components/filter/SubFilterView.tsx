import { Button, Grid, Select, Text } from '@geist-ui/core'
import { Map } from '@geist-ui/icons'
import AlignJustify from '@geist-ui/icons/alignJustify'
import { FC } from 'react'

export const SubFilterView: FC = () => (
    <>
        <Grid xs={12}>
            <Button
                type="secondary"
                icon={<AlignJustify />}
                style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                List
            </Button>
            <Button
                icon={<Map />}
                style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}
            >
                Map
            </Button>
        </Grid>
        <Grid xs={8}></Grid>
        <Grid xs={4}>
            <Grid.Container>
                <Grid xs={24} justify="flex-end">
                    <Text small em>
                        Sort by ...
                    </Text>
                </Grid>
                <Grid xs={24} justify="flex-end">
                    <Select defaultValue={'1'} value="1" onChange={() => {}}>
                        <Select.Option value="1">
                            Descending Insertion date
                        </Select.Option>
                        <Select.Option value="2">
                            Ascending Price per month
                        </Select.Option>
                        <Select.Option value="3">
                            Asceding Space in square meter
                        </Select.Option>
                    </Select>
                </Grid>
            </Grid.Container>
        </Grid>
    </>
)

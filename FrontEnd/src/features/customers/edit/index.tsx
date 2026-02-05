import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

export const CustomerEdit = () => {

  return (<>
    <Tabs
      orientation='vertical'
      defaultValue='overview'
      className='space-y-4'
    >
      <div className='w-full overflow-x-auto pb-2'>
        <TabsList>
          <TabsTrigger value='main'>Main</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='reports' disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value='notifications' disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='main' className='space-y-4'>
      </TabsContent>
      <TabsContent value='analytics' className='space-y-4'>
        Analitics
      </TabsContent>
    </Tabs>
  </>)
}

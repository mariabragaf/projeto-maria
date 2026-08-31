import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#e8bfff",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />

      <Tabs.Screen
      name="sobre"
      option={{
        title: "Sobre",
        headerTitle: "sobre",
      }}
      />

       <Tabs.Screen
      name="aulas - API"
      option={{
        title: "API",
        headerTitle: "Conteudo - API",
      }}
      />

       <Tabs.Screen
      name="aulas - Post"
      option={{
        title: "Post",
        headerTitle: "Conteudo - Post",
      }}
      />
      
    </Tabs>
  );
}

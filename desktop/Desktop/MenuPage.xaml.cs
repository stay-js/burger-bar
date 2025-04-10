﻿using Desktop_Lib;
using System.Data;
using System.Net.Http;
using System.Windows;
using System.Windows.Controls;

namespace Desktop
{
    public partial class MenuPage : UserControl
    {
        private readonly MainWindow _mainWindow;

        private readonly string API_ENDPOINT = "/api/menu";

        public MenuPage(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            _ = LoadMenu();
        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();

        private async Task LoadMenu()
        {
            Menu.Visibility = Visibility.Collapsed;
            Loading.Visibility = Visibility.Visible;

            try
            {
                var items = await _mainWindow
                    .ApiClient
                    .GetAsync<Desktop_Lib.MenuItem[]>(API_ENDPOINT);

                Menu.ItemsSource = items;
            }
            catch (Exception ex)
            {
                MessageBoxHelper.Error(ex.Message);
            }

            Menu.Visibility = Visibility.Visible;
            Loading.Visibility = Visibility.Collapsed;
        }

        private async void CreateButton_Click(object sender, RoutedEventArgs e)
        {
            var createDialog = new ModifyMenuItemDialog(null);

            if (createDialog.ShowDialog() == true)
            {
                var item = new Desktop_Lib.CreateMenuItem(createDialog.ItemName.Text,
                    int.Parse(createDialog.Price.Text),
                    createDialog.Description.Text,
                    createDialog.Image.Text);

                try
                {
                    await _mainWindow
                        .ApiClient
                        .PostPutPatchOrDeleteAsync(API_ENDPOINT, HttpMethod.Post, item);
                }
                catch (Exception ex)
                {
                    MessageBoxHelper.Error(ex.Message);
                }

                await LoadMenu();
            }
        }

        private async void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (Menu.SelectedItems.Count == 0) return;
            if (Menu.SelectedItems.Count > 1)
            {
                MessageBoxHelper.ModifyMoreThanOneWarning();
                return;
            }

            var selectedItem = (Menu.SelectedItem as Desktop_Lib.MenuItem)!;

            var modifyDialog = new ModifyMenuItemDialog(selectedItem);

            if (modifyDialog.ShowDialog() == true)
            {

                var item = new Desktop_Lib.MenuItem(
                   selectedItem.ID,
                   modifyDialog.ItemName.Text,
                   int.Parse(modifyDialog.Price.Text),
                   modifyDialog.Description.Text,
                   modifyDialog.Image.Text);

                try
                {
                    await _mainWindow
                        .ApiClient
                        .PostPutPatchOrDeleteAsync(API_ENDPOINT, HttpMethod.Patch, item);
                }
                catch (Exception ex)
                {
                    MessageBoxHelper.Error(ex.Message);
                }

                await LoadMenu();
            }
        }
        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (Menu.SelectedItems.Count == 0) return;

            var result = MessageBoxHelper.DeleteConfirmation();
            if (result == MessageBoxResult.No) return;

            var ids = Menu.SelectedItems.Cast<Desktop_Lib.MenuItem>().Select(x => x.ID);

            try
            {
                await _mainWindow
                    .ApiClient
                    .PostPutPatchOrDeleteAsync(API_ENDPOINT, HttpMethod.Delete, new IdsToDelete(ids));
            }
            catch (Exception ex)
            {
                MessageBoxHelper.Error(ex.Message);
            }

            await LoadMenu();
        }

        private async void RefreshButton_Click(object sender, RoutedEventArgs e) =>
            await LoadMenu();
    }
}
